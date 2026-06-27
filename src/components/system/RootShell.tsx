'use client';



import { useState } from 'react';
import BootSequence from '@/components/system/BootSequence';

interface RootShellProps {
  children: React.ReactNode;
}

export default function RootShell({ children }: RootShellProps) {
  const [bootDone, setBootDone] = useState(false);

  return (
    <>
      {!bootDone && <BootSequence onComplete={() => setBootDone(true)} />}
      <main id="main-content">{children}</main>
    </>
  );
}