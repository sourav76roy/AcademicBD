import {
  AudioOutlined,
  CheckOutlined,
  CloudUploadOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import * as Bytescale from "@bytescale/sdk";
import { Button, Spin, Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";

export default function AudioRecorder({ setAudioURL, audioURL }) {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlobs, setAudioBlobs] = useState(null);
  const [isUploadLoading, setIsUploadLoading] = useState(false);

  // recording function
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      });
    } else {
      clearInterval(interval);
      setRecordingTime(0);
    }

    return () => clearInterval(interval);
  }, [isRecording]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        setAudioBlobs(audioBlob);
        const audioURL = URL.createObjectURL(audioBlob);
        audioChunksRef.current = [];

        // Convert audioBlob to bytescale
        const reader = new FileReader();
        reader.onloadend = () => {
          const bytescale = new Uint8Array(reader.result);
        };
        reader.readAsArrayBuffer(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const options = {
    apiKey: import.meta.env.VITE_Audio_File_URL,
    maxFileCount: 1,
  };

  const uploadManager = new Bytescale.UploadManager(options);

  // bytescale upload audio
  const handleUpload = async (audioBlob) => {
    setIsUploadLoading(true);
    try {
      const { fileUrl, filePath } = await uploadManager.upload({
        data: audioBlob,
      });
      setAudioURL({ fileUrl, filePath });
      setAudioBlobs(null);
      setIsUploadLoading(false);
    } catch (error) {
      console.error("Error uploading to Bytescale:", error);
      setIsUploadLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-start justify-start gap-4">
      <Spin spinning={isUploadLoading}>
        <div className="flex items-center justify-start gap-4">
          {/* recording button */}
          <Tooltip
            title={
              isRecording
                ? "Stop Recording"
                : audioBlobs
                ? "Restart Recording"
                : "Start Recording"
            }
          >
            <Button
              type="primary"
              shape="circle"
              icon={
                isRecording ? (
                  <CheckOutlined />
                ) : audioBlobs ? (
                  <ReloadOutlined />
                ) : (
                  <AudioOutlined />
                )
              }
              onClick={isRecording ? stopRecording : startRecording}
            />
          </Tooltip>

          {/* Upload button */}
          {audioBlobs && (
            <Tooltip title="Upload Now">
              <Button
                type="default"
                shape="circle"
                onClick={() => handleUpload(audioBlobs)}
                icon={
                  <CloudUploadOutlined className="text-2xl text-green-500" />
                }
              />
            </Tooltip>
          )}
          {/* Recording time display */}
          <p className="text-lg font-medium">{formatTime(recordingTime)}</p>
        </div>

        {/* blobs */}
        {audioBlobs && <audio controls src={URL.createObjectURL(audioBlobs)} />}

        {/* uploaded audio */}
        {audioURL?.fileUrl && (
          <div>
            <audio controls src={audioURL?.fileUrl} />
          </div>
        )}
      </Spin>
    </div>
  );
}
