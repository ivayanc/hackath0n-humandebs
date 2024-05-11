'use client';

import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import React, { useContext, useState } from 'react';

import { LayoutContext } from '@/layout/context/layoutcontext';

const LoginPage = () => {
  const [password, setPassword] = useState('');
  const { layoutConfig } = useContext(LayoutContext);

  const router = useRouter();
  const containerClassName = classNames(
    'surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden',
    { 'p-input-filled': layoutConfig.inputStyle === 'filled' }
  );

  return (
    <div
      className={containerClassName}
      style={{
        backgroundImage: 'url("/images/background.svg")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="flex-column align-items-center justify-content-center flex">
        <div
          style={{
            borderRadius: '6px',
            padding: '0.1rem',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)'
          }}
        >
          <div className="surface-card w-full px-5 py-8 sm:px-8">
            <div className="mb-5 text-center">
              <div className="text-900 mb-3 text-3xl font-medium">
                Sign in to continue
              </div>
            </div>

            <div>
              <label
                htmlFor="email1"
                className="text-900 mb-2 block text-xl font-medium"
              >
                Email
              </label>
              <InputText
                id="email1"
                type="text"
                placeholder="Email address"
                className="md:w-30rem mb-5 w-full"
                style={{ padding: '1rem' }}
              />
              <label
                htmlFor="password1"
                className="text-900 mb-2 block text-xl font-medium"
              >
                Password
              </label>
              <Password
                inputId="password1"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                toggleMask
                className="mb-5 w-full"
                inputClassName="w-full p-3 md:w-30rem"
                feedback={false}
              />
              <div className="align-items-center justify-content-between mb-5 flex gap-5">
                <a
                  className="ml-2 cursor-pointer text-right font-medium no-underline"
                  style={{ color: 'var(--primary-color)' }}
                >
                  Forgot password?
                </a>
              </div>
              <Button
                label="Sign In"
                className="w-full p-3 text-xl"
                onClick={() => router.push('/')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
