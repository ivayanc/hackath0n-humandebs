'use client';

import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import React, { useContext, useState } from 'react';

import { LayoutContext } from '@/layout/context/layoutcontext';
import { AuthService } from '@/lib/services /AuthService';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { layoutConfig } = useContext(LayoutContext);

  const router = useRouter();
  const containerClassName = classNames(
    'surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden',
    { 'p-input-filled': layoutConfig.inputStyle === 'filled' }
  );

  const handleSubmit = async () => {
    if (!email || !password) {
      return;
    }

    try {
      await AuthService.login({ email, password });
      router.push('/volunteer');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

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
                required
                id="email1"
                type="text"
                placeholder="Email address"
                onChange={e => setEmail(e.target.value)}
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
                required
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
                <div className="align-items-center flex" />
              </div>
              <Button
                label="Увійти"
                className="w-full p-3 text-xl"
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
