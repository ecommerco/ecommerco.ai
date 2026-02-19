"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Github, Smartphone, Apple, User, Mic } from "lucide-react";
import { Navbar } from "@/components/Navbar";

// Simple Google Icon Component
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.23856)">
      <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
      <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
      <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.734 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
      <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
    </g>
  </svg>
);

// Simple Apple Icon Component (Using Path)
const AppleIcon = () => (
   <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
     <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-.68-.32-1.42-.48-2.12-.48-.68 0-1.45.17-2.15.49-1.02.48-2.09.54-3.02-.42C2.7 16.4 3.03 9.07 9.25 8.9c.89-.01 1.57.34 2.1.65.44.25.86.5 1.4.5.62 0 1.1-.31 1.63-.66.69-.45 1.58-.93 2.76-.84.86.07 3.02.32 3.99 1.74-3.4 2.05-2.83 6.36 1.05 7.94-.65 1.73-1.63 3.48-2.68 4.67-.4.46-.86.9-1.45 1.38zM12.04 8.78c-.03-.11-.04-.22-.04-.33 0-1.54 1.25-2.79 2.79-2.79.08 0 .16.01.24.02-.19 1.66-1.57 2.92-3.14 2.95.05.05.1.1.15.15z"/>
   </svg>
);

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [authMethod, setAuthMethod] = useState<'face' | 'voice' | 'email' | 'phone'>('face');
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isScanningFace, setIsScanningFace] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recognitionRef = useRef<any>(null);

  // Cleanup streams on unmount
  useEffect(() => {
    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
      }
      if (audioStream) {
        audioStream.getTracks().forEach(track => track.stop());
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [videoStream, audioStream]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!email) {
      setError("Email is required");
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const apiUrl = typeof window !== 'undefined' 
        ? `${window.location.origin}/api/auth/otp`
        : '/api/auth/otp';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'send',
          email: email.trim().toLowerCase(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to send OTP');
      }

      setIsLoading(false);
      setOtpSent(true);
      setError("");
      
    } catch (error: any) {
      setError(error.message || "Failed to send verification code. Please try again.");
      setIsLoading(false);
    }
  };

  const handleOtpVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!otpCode || otpCode.length !== 6) {
      setError("Please enter a valid 6-digit code");
      return;
    }

    if (!/^\d{6}$/.test(otpCode)) {
      setError("Code must contain only numbers");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const apiUrl = typeof window !== 'undefined' 
        ? `${window.location.origin}/api/auth/otp`
        : '/api/auth/otp';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'verify',
          email: authMethod === 'email' ? email.trim().toLowerCase() : undefined,
          phone: authMethod === 'phone' ? phone.trim() : undefined,
          code: otpCode.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Invalid verification code');
      }

      // Store token securely
      if (data.token) {
        localStorage.setItem('auth_token', data.token);
        // Set expiration if provided
        if (data.expiresAt) {
          localStorage.setItem('auth_token_expires', data.expiresAt.toString());
        }
      }

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error: any) {
      setError(error.message || "Invalid verification code. Please try again.");
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("Google login will be available soon. Please use Face, Voice, Email, or Phone authentication.");
  };

  const handleGithubLogin = async () => {
    setError("GitHub login will be available soon. Please use Face, Voice, Email, or Phone authentication.");
  };

  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!phone) {
      setError("Phone number is required");
      return;
    }

    // Basic phone validation (international format)
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    const cleanedPhone = phone.replace(/\s|-|\(|\)/g, '');
    if (!phoneRegex.test(cleanedPhone)) {
      setError("Please enter a valid phone number (e.g., +1234567890)");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const apiUrl = typeof window !== 'undefined' 
        ? `${window.location.origin}/api/auth/otp`
        : '/api/auth/otp';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'send',
          phone: cleanedPhone,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to send OTP');
      }

      setIsLoading(false);
      setOtpSent(true);
      setError("");
      
    } catch (error: any) {
      setError(error.message || "Failed to send verification code. Please try again.");
      setIsLoading(false);
    }
  };

  const handleFaceLogin = async () => {
    setError("");
    setIsLoading(true);
    setIsScanningFace(true);

    try {
      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 640 },
          height: { ideal: 480 }
        } 
      });

      setVideoStream(stream);

      // Create video element to capture face
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();

      // Wait for video to be ready
      await new Promise((resolve) => {
        video.onloadedmetadata = () => resolve(null);
      });

      // Wait 2 seconds for user to position face
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Capture frame
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0);

      // Stop camera
      stream.getTracks().forEach(track => track.stop());
      setVideoStream(null);

      // Convert canvas to base64 with compression
      const imageBase64 = canvas.toDataURL('image/jpeg', 0.85).split(',')[1];

      // Validate image size (max 5MB)
      const imageSize = (imageBase64.length * 3) / 4;
      if (imageSize > 5 * 1024 * 1024) {
        throw new Error('Image is too large. Please try again.');
      }

      // Send to backend API for face recognition
      const apiUrl = typeof window !== 'undefined' 
        ? `${window.location.origin}/api/auth/face`
        : '/api/auth/face';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageBase64 }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Face recognition failed');
      }

      // Store token securely
      if (data.token) {
        localStorage.setItem('auth_token', data.token);
        if (data.expiresAt) {
          localStorage.setItem('auth_token_expires', data.expiresAt.toString());
        }
      }

      setIsScanningFace(false);
      router.push("/dashboard");
    } catch (error: any) {
      setIsScanningFace(false);
      if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
        setVideoStream(null);
      }
      setError(error.message || "Face recognition failed. Please try again.");
      setIsLoading(false);
    }
  };

  const handleVoiceLogin = async () => {
    setError("");
    setIsLoading(true);
    setIsRecording(true);

    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Use Web Speech API for voice recognition
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        recognition.maxAlternatives = 1;

        recognitionRef.current = recognition;

        recognition.onresult = async (event: any) => {
          try {
            const transcript = event.results[0][0].transcript;
            
            // Stop recording
            stream.getTracks().forEach(track => track.stop());
            setAudioStream(null);
            setIsRecording(false);

            // Send transcript to backend for voice verification
            const apiUrl = typeof window !== 'undefined' 
              ? `${window.location.origin}/api/auth/voice`
              : '/api/auth/voice';
            
            const response = await fetch(apiUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ transcript: transcript.trim() }),
            });

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (!data.success) {
              throw new Error(data.error || 'Voice recognition failed');
            }

            // Store token securely
            if (data.token) {
              localStorage.setItem('auth_token', data.token);
              if (data.expiresAt) {
                localStorage.setItem('auth_token_expires', data.expiresAt.toString());
              }
            }

            router.push("/dashboard");
          } catch (error: any) {
            setError(error.message || 'Voice recognition failed. Please try again.');
            setIsLoading(false);
          }
        };

        recognition.onerror = (event: any) => {
          stream.getTracks().forEach(track => track.stop());
          setAudioStream(null);
          setIsRecording(false);
          
          let errorMessage = "Voice recognition failed. Please try again.";
          if (event.error === 'no-speech') {
            errorMessage = "No speech detected. Please try again.";
          } else if (event.error === 'audio-capture') {
            errorMessage = "Microphone not found. Please check your microphone settings.";
          } else if (event.error === 'not-allowed') {
            errorMessage = "Microphone access denied. Please allow microphone access.";
          }
          
          setError(errorMessage);
          setIsLoading(false);
        };

        recognition.onend = () => {
          if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setAudioStream(null);
          }
        };

        recognition.start();
        setAudioStream(stream);
      } else {
        // Fallback: Use MediaRecorder API
        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: 'audio/webm;codecs=opus',
        });
        const audioChunks: Blob[] = [];

        mediaRecorderRef.current = mediaRecorder;
        setAudioStream(stream);

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunks.push(event.data);
          }
        };

        mediaRecorder.onstop = async () => {
          try {
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            
            // Validate audio size (max 10MB)
            if (audioBlob.size > 10 * 1024 * 1024) {
              throw new Error('Audio file is too large. Please try again.');
            }

            // Convert audio blob to base64
            const reader = new FileReader();
            reader.onloadend = async () => {
              try {
                const audioBase64 = (reader.result as string).split(',')[1];

                // Send to backend API for voice recognition
                const apiUrl = typeof window !== 'undefined' 
                  ? `${window.location.origin}/api/auth/voice`
                  : '/api/auth/voice';
                
                const response = await fetch(apiUrl, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ audio: audioBase64 }),
                });

                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                setIsRecording(false);
                stream.getTracks().forEach(track => track.stop());
                setAudioStream(null);

                if (!data.success) {
                  throw new Error(data.error || 'Voice recognition failed');
                }

                // Store token securely
                if (data.token) {
                  localStorage.setItem('auth_token', data.token);
                  if (data.expiresAt) {
                    localStorage.setItem('auth_token_expires', data.expiresAt.toString());
                  }
                }

                router.push("/dashboard");
              } catch (error: any) {
                setError(error.message || 'Voice recognition failed. Please try again.');
                setIsLoading(false);
                stream.getTracks().forEach(track => track.stop());
                setAudioStream(null);
              }
            };
            reader.onerror = () => {
              setError('Failed to process audio. Please try again.');
              setIsLoading(false);
              stream.getTracks().forEach(track => track.stop());
              setAudioStream(null);
            };
            reader.readAsDataURL(audioBlob);
          } catch (error: any) {
            setError(error.message || 'Voice recognition failed. Please try again.');
            setIsLoading(false);
            stream.getTracks().forEach(track => track.stop());
            setAudioStream(null);
          }
        };

        mediaRecorder.onerror = (event: any) => {
          setError('Recording error. Please try again.');
          setIsLoading(false);
          stream.getTracks().forEach(track => track.stop());
          setAudioStream(null);
        };

        mediaRecorder.start();
        
        // Record for 5 seconds max
        setTimeout(() => {
          if (mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
          }
        }, 5000);
      }
    } catch (error: any) {
      setIsRecording(false);
      setError(error.message || "Voice recognition failed. Please allow microphone access.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary/30 flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center p-6 pt-24">
        <div className="w-full max-w-md relative">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full opacity-20 pointer-events-none" />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-gradient-to-br from-white/5 via-white/5 to-white/3 border border-white/10 p-8 md:p-10 rounded-3xl backdrop-blur-xl shadow-2xl"
          >
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 mb-4">
                <User className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Welcome Back
              </h1>
              <p className="text-gray-400 text-sm">Secure passwordless authentication - Choose your preferred method</p>
            </div>

            {/* Auth Method Tabs */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              <button
                onClick={() => {
                  setAuthMethod('face');
                  setOtpSent(false);
                  setOtpCode("");
                }}
                className={`group flex flex-col items-center justify-center gap-2.5 py-4 rounded-xl text-sm font-semibold transition-all border-2 ${
                  authMethod === 'face' 
                    ? 'bg-gradient-to-br from-primary to-yellow-400 text-black border-primary shadow-lg shadow-primary/20 scale-105' 
                    : 'bg-black/40 text-gray-400 border-white/10 hover:border-primary/30 hover:text-white hover:bg-black/60 hover:scale-102'
                }`}
              >
                <User className={`w-5 h-5 transition-transform ${authMethod === 'face' ? 'scale-110' : 'group-hover:scale-110'}`} />
                <span>Face</span>
              </button>
              <button
                onClick={() => {
                  setAuthMethod('voice');
                  setOtpSent(false);
                  setOtpCode("");
                }}
                className={`group flex flex-col items-center justify-center gap-2.5 py-4 rounded-xl text-sm font-semibold transition-all border-2 ${
                  authMethod === 'voice' 
                    ? 'bg-gradient-to-br from-primary to-yellow-400 text-black border-primary shadow-lg shadow-primary/20 scale-105' 
                    : 'bg-black/40 text-gray-400 border-white/10 hover:border-primary/30 hover:text-white hover:bg-black/60 hover:scale-102'
                }`}
              >
                <Mic className={`w-5 h-5 transition-transform ${authMethod === 'voice' ? 'scale-110' : 'group-hover:scale-110'}`} />
                <span>Voice</span>
              </button>
              <button
                onClick={() => {
                  setAuthMethod('email');
                  setOtpSent(false);
                  setOtpCode("");
                }}
                className={`group flex flex-col items-center justify-center gap-2.5 py-4 rounded-xl text-sm font-semibold transition-all border-2 ${
                  authMethod === 'email' 
                    ? 'bg-gradient-to-br from-primary to-yellow-400 text-black border-primary shadow-lg shadow-primary/20 scale-105' 
                    : 'bg-black/40 text-gray-400 border-white/10 hover:border-primary/30 hover:text-white hover:bg-black/60 hover:scale-102'
                }`}
              >
                <Mail className={`w-5 h-5 transition-transform ${authMethod === 'email' ? 'scale-110' : 'group-hover:scale-110'}`} />
                <span>Email</span>
              </button>
              <button
                onClick={() => {
                  setAuthMethod('phone');
                  setOtpSent(false);
                  setOtpCode("");
                }}
                className={`group flex flex-col items-center justify-center gap-2.5 py-4 rounded-xl text-sm font-semibold transition-all border-2 ${
                  authMethod === 'phone' 
                    ? 'bg-gradient-to-br from-primary to-yellow-400 text-black border-primary shadow-lg shadow-primary/20 scale-105' 
                    : 'bg-black/40 text-gray-400 border-white/10 hover:border-primary/30 hover:text-white hover:bg-black/60 hover:scale-102'
                }`}
              >
                <Smartphone className={`w-5 h-5 transition-transform ${authMethod === 'phone' ? 'scale-110' : 'group-hover:scale-110'}`} />
                <span>Phone</span>
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Face Recognition */}
            {authMethod === 'face' && (
              <div className="space-y-6">
                <div className="text-center py-6">
                  <div className="relative w-64 h-64 mx-auto mb-6 rounded-2xl border-2 border-primary/30 overflow-hidden bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-sm">
                    {isScanningFace ? (
                      <>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-full h-full bg-gradient-to-br from-primary/10 via-primary/5 to-transparent animate-pulse" />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative">
                            <div className="w-32 h-32 rounded-full border-4 border-primary/50 animate-ping" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <User className="w-20 h-20 text-primary" />
                            </div>
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-0 right-0 text-center">
                          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30">
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                            <span className="text-sm font-medium text-primary">Scanning...</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/30 flex items-center justify-center">
                            <User className="w-12 h-12 text-primary/60" />
                          </div>
                          <p className="text-xs text-gray-500 mt-2">Position your face in the frame</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-white">Face Recognition</h3>
                    <p className="text-sm text-gray-400 max-w-sm mx-auto">
                      {isScanningFace 
                        ? "Please look directly at the camera and keep still" 
                        : "Secure biometric authentication using facial recognition technology"}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={handleFaceLogin}
                  disabled={isLoading || isScanningFace}
                  className="w-full h-14 bg-gradient-to-r from-primary to-yellow-400 text-black font-bold rounded-xl hover:from-yellow-400 hover:to-primary transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading || isScanningFace ? (
                    <>
                      <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      <span>{isScanningFace ? 'Scanning Face...' : 'Processing...'}</span>
                    </>
                  ) : (
                    <>
                      <User className="w-5 h-5" />
                      <span>Start Face Recognition</span>
                    </>
                  )}
                </button>
                {error && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                    {error}
                  </div>
                )}
              </div>
            )}

            {/* Voice Recognition */}
            {authMethod === 'voice' && (
              <div className="space-y-6">
                <div className="text-center py-6">
                  <div className="relative w-64 h-64 mx-auto mb-6 rounded-2xl border-2 border-primary/30 overflow-hidden bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-sm flex items-center justify-center">
                    {isRecording ? (
                      <>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-full h-full bg-gradient-to-br from-primary/10 via-primary/5 to-transparent animate-pulse" />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative">
                            <div className="w-32 h-32 rounded-full border-4 border-primary/50 animate-ping" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Mic className="w-20 h-20 text-primary" />
                            </div>
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-0 right-0 text-center">
                          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30">
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                            <span className="text-sm font-medium text-primary">Listening...</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-center">
                        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/30 flex items-center justify-center">
                          <Mic className="w-12 h-12 text-primary/60" />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Speak clearly into your microphone</p>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-white">Voice Recognition</h3>
                    <p className="text-sm text-gray-400 max-w-sm mx-auto">
                      {isRecording 
                        ? "Speak your passphrase clearly and naturally" 
                        : "Secure biometric authentication using your unique voice signature"}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={handleVoiceLogin}
                  disabled={isLoading || isRecording}
                  className="w-full h-14 bg-gradient-to-r from-primary to-yellow-400 text-black font-bold rounded-xl hover:from-yellow-400 hover:to-primary transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading || isRecording ? (
                    <>
                      <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      <span>{isRecording ? 'Recording...' : 'Processing...'}</span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-5 h-5" />
                      <span>Start Voice Recognition</span>
                    </>
                  )}
                </button>
                {error && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                    {error}
                  </div>
                )}
              </div>
            )}

            {/* Email OTP */}
            {authMethod === 'email' && (
              <div className="space-y-6">
                {!otpSent ? (
                  <form onSubmit={handleEmailLogin} className="space-y-5">
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-gray-200 ml-1 flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input 
                          type="email" 
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full h-14 bg-black/60 border-2 border-white/10 rounded-xl px-12 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-base"
                          placeholder="name@example.com"
                        />
                      </div>
                      <p className="text-xs text-gray-400 ml-1 flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        We&apos;ll send you a secure 6-digit verification code
                      </p>
                    </div>
                    <button 
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-14 bg-gradient-to-r from-primary to-yellow-400 text-black font-bold rounded-xl hover:from-yellow-400 hover:to-primary transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Verification Code</span>
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleOtpVerify} className="space-y-5">
                    <div className="text-center py-4">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 border-2 border-primary/30 flex items-center justify-center">
                        <Mail className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">Check Your Email</h3>
                      <p className="text-sm text-gray-400 mb-1">We sent a verification code to</p>
                      <p className="text-sm font-medium text-primary">{email}</p>
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-gray-200 ml-1">Verification Code</label>
                      <input 
                        type="text" 
                        required
                        maxLength={6}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                        className="w-full h-16 bg-black/60 border-2 border-white/10 rounded-xl px-6 text-white text-center text-3xl font-bold tracking-widest focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="000000"
                      />
                      <div className="flex items-center justify-between text-xs">
                        <button
                          type="button"
                          onClick={() => {
                            setOtpSent(false);
                            setOtpCode("");
                          }}
                          className="text-gray-400 hover:text-primary transition-colors"
                        >
                          Change email
                        </button>
                        <button
                          type="button"
                          onClick={handleEmailLogin}
                          className="text-primary hover:text-yellow-400 transition-colors font-medium"
                        >
                          Resend code
                        </button>
                      </div>
                    </div>
                    <button 
                      type="submit"
                      disabled={isLoading || otpCode.length !== 6}
                      className="w-full h-14 bg-gradient-to-r from-primary to-yellow-400 text-black font-bold rounded-xl hover:from-yellow-400 hover:to-primary transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                          <span>Verifying...</span>
                        </>
                      ) : (
                        <>
                          <span>Verify Code</span>
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
                {error && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                    {error}
                  </div>
                )}
              </div>
            )}

            {/* Phone OTP */}
            {authMethod === 'phone' && (
              <div className="space-y-6">
                {!otpSent ? (
                  <form onSubmit={handlePhoneLogin} className="space-y-5">
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-gray-200 ml-1 flex items-center gap-2">
                        <Smartphone className="w-4 h-4" />
                        Phone Number
                      </label>
                      <div className="relative">
                        <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input 
                          type="tel" 
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full h-14 bg-black/60 border-2 border-white/10 rounded-xl px-12 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-base"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                      <div id="recaptcha-container"></div>
                      <p className="text-xs text-gray-400 ml-1 flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        We&apos;ll send you a secure 6-digit verification code via SMS
                      </p>
                    </div>
                    <button 
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-14 bg-gradient-to-r from-primary to-yellow-400 text-black font-bold rounded-xl hover:from-yellow-400 hover:to-primary transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Verification Code</span>
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleOtpVerify} className="space-y-5">
                    <div className="text-center py-4">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 border-2 border-primary/30 flex items-center justify-center">
                        <Smartphone className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">Check Your Phone</h3>
                      <p className="text-sm text-gray-400 mb-1">We sent a verification code to</p>
                      <p className="text-sm font-medium text-primary">{phone}</p>
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-gray-200 ml-1">Verification Code</label>
                      <input 
                        type="text" 
                        required
                        maxLength={6}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                        className="w-full h-16 bg-black/60 border-2 border-white/10 rounded-xl px-6 text-white text-center text-3xl font-bold tracking-widest focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="000000"
                      />
                      <div className="flex items-center justify-between text-xs">
                        <button
                          type="button"
                          onClick={() => {
                            setOtpSent(false);
                            setOtpCode("");
                          }}
                          className="text-gray-400 hover:text-primary transition-colors"
                        >
                          Change number
                        </button>
                        <button
                          type="button"
                          onClick={handlePhoneLogin}
                          className="text-primary hover:text-yellow-400 transition-colors font-medium"
                        >
                          Resend code
                        </button>
                      </div>
                    </div>
                    <button 
                      type="submit"
                      disabled={isLoading || otpCode.length !== 6}
                      className="w-full h-14 bg-gradient-to-r from-primary to-yellow-400 text-black font-bold rounded-xl hover:from-yellow-400 hover:to-primary transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                          <span>Verifying...</span>
                        </>
                      ) : (
                        <>
                          <span>Verify Code</span>
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
                {error && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                    {error}
                  </div>
                )}
              </div>
            )}

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <button 
                type="button"
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="flex items-center justify-center h-12 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <GoogleIcon />
              </button>
              <button 
                type="button"
                disabled
                className="flex items-center justify-center h-12 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20 transition-all text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <AppleIcon />
              </button>
              <button 
                type="button"
                onClick={handleGithubLogin}
                disabled={isLoading}
                className="flex items-center justify-center h-12 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20 transition-all text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Github className="w-5 h-5" />
              </button>
            </div>

            <p className="text-center text-sm text-gray-500 mt-8">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-primary hover:underline font-medium">
                Create Store
              </Link>
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
