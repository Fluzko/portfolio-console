import { FC, useEffect } from "react";
import { DelayedRender } from "../delayedRender";
import { Text } from "../text";
import { TypewritterEffect } from "../typewritterEffect";
import dayjs from "dayjs";

const writingText = " ssh -i certificate.pem facundo@128.3.11.97";
const logginingInDelay = writingText.length * 50 + 1e3;
const welcomeMsgDelay = logginingInDelay + 3e3;

type LoginAnimationComponent = FC<{
  onReady: () => unknown;
}>;

export const LoginAnimation: LoginAnimationComponent = ({ onReady }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onReady();
    }, welcomeMsgDelay);

    return () => clearTimeout(timeout);
  });
  return (
    <>
      <Text>
        user@local:
        <TypewritterEffect text={writingText} delay={50} />
      </Text>

      <DelayedRender delay={logginingInDelay}>
        <Text>user@local: loggin in...</Text>
      </DelayedRender>
      <DelayedRender delay={welcomeMsgDelay}>
        <Text>
          Welcome to Ubuntu (GNU/Linux 5.15.0-1031-aws x86_64)
          <br />
          <br />
          * available commands:
          <br />
          ** ls
          <br />
          ** cd
          <br />
          ** cat
          <br />
          <br />
          Last login:{" "}
          {dayjs().subtract(1, "d").format("dddd MMM D HH:MM:ss YYYY")} from
          152.168.207.113
        </Text>
      </DelayedRender>
    </>
  );
};
