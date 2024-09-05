import React, {useEffect, useState} from "react";
import Router from "next/router";
import TextInput from "../components/inputs/TextInput";
import Button from "../components/global/Button";
import useAuth from "../hooks/useAuth";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const {login} = useAuth();
  const [dark, setDark] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    setDark(localStorage.theme === "dark" ? true : false);
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="login-bg absolute top-0 left-0 w-full h-full -z-10 opacity-5" />
        <div className="px-5 py-10 bg-primary-10 rounded-xl">
          <div className="flex flex-col items-center justify-center relative">
            <p className="text-3xl text-[#101828] mt-10">Log in</p>
            <p className="text-[#475467] mb-8 mt-1">
              Welcome back! Please enter your details.
            </p>
          </div>
          <div className="w-[360px] flex flex-col item-center gap-6 justify-center">
            <input type="hidden" name="remember" defaultValue="true" />
            <TextInput
              onChange={(value: string) => {
                setEmail(value);
              }}
              title="Email"
              placeholder="Enter your email"
              width="max-w-[370px]"
              value={email}
            />
            <TextInput
              onChange={(value: string) => {
                setPassword(value);
              }}
              title="Password"
              placeholder="password"
              width="max-w-[370px]"
              value={password}
              // onKeyDown={(e: any) => {
              //   if (e.key === "Enter") {
              //     login(email, password);
              //   }
              // }}
            />

            <div>
              <Button
              widthClass="w-full"
                label="Login"
                onClick={() => login(email, password)}
              />
            </div>
          </div>
          {/* <div className="flex items-center justify-between mt-4">
            <div className="text-sm w-full flex items-center justify-between">
              <a
                href="#"
                className="font-medium w-full text-center text-primary-900 hover:text-primary-900"
              >
                Forgot your password?
              </a>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};
export default Login;
