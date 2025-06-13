"use client";
import { LiveKitRoom, VideoConference } from '@livekit/components-react';
import '@livekit/components-styles';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function VideoRoomPage({params}) {
   
 
  if (!params.key) {
    return <div>Loading...</div>;
  }

  return (
    <LiveKitRoom
      token={params.key}
      serverUrl="wss://livekit.pretutors.com"
      connect={true}
      data-lk-theme="default"
      style={{ height: '100vh' }}
    >
      <VideoConference />
    </LiveKitRoom>
  );
}
