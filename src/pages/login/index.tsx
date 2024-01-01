import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useLoginMutation } from '@/network/module/auth';
import { setCookie } from 'cookies-next';

interface FormInput {
  username: string;
  password: string;
}

const Index: React.FC = () => {
  const { handleSubmit, register } = useForm<FormInput>();
  const [auth] = useLoginMutation();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    try {
      const response = await auth({ username: data.username, password: data.password });

      // Use discriminated union to handle different response types
      if ('data' in response && response.data) {
        const accessToken = response.data.token;

        // Check if accessToken exists before setting the cookie
        if (accessToken) {
          setCookie('accessToken', accessToken);
        }
          console.log("🚀 ~ file: index.tsx:27 ~ constonSubmit:SubmitHandler<FormInput>= ~ accessToken:", accessToken)
      }
    } catch (error) {
      // Handle error if needed
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Username:
          <input {...register('username')} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" {...register('password')} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      gg
    </div>
  );
};

export default Index;
