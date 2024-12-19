import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface IInputSectionProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  register?: UseFormRegisterReturn;
}

/**
 * 일렬형 제목과 input요소
 * 현재 로그인, 회원가입 등 페이지에서 사용
 */
export default function InputSection(props: IInputSectionProps) {
  const { label, register, ...rest } = props;

  return (
    <section className="flex w-full items-center">
      <span className="w-[120px] font-semibold">{label}</span>
      <input className="w-full border p-2" {...rest} {...register} />
    </section>
  );
}
