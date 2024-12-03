"use client";
import { useEffect, useState } from "react";

export default function ChatSection() {
  const [messages, setMessages] = useState<
    { username: string; message: string }[]
  >([]);
  const [username, setUsername] = useState<string>(""); // 입력 필드의 유저
  const [message, setMessage] = useState<string>(""); // 입력 필드의 메시지
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    // WebSocket 연결
    const ws = new WebSocket(`ws://${process.env.AWS_SOCKET_SERVER}:4000`);

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    ws.onmessage = async (event) => {
      const texted = await event.data.text();

      const jsoned = JSON.parse(texted);

      console.log("Received:", jsoned);
      setMessages((prev) => [...prev, jsoned]); // 메시지 상태 업데이트
    };

    ws.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    setSocket(ws);

    return () => {
      ws.close(); // 컴포넌트 언마운트 시 WebSocket 연결 종료
    };
  }, []);

  const handleSendMessage = () => {
    if (socket && username.trim() !== "" && message.trim() !== "") {
      socket.send(JSON.stringify({ username, message })); // 서버로 메시지 전송
      setMessage(""); // 입력 필드 초기화
    }
  };

  return (
    <section className="flex w-[500px] flex-col gap-[10px]">
      <span className="text-[16px] font-bold">실시간 채팅</span>
      <div className="h-[300px] w-[400px] overflow-y-auto overscroll-none rounded-[10px] border-[1px] border-gray-400 p-[10px]">
        {messages.map((msg, index) => (
          <p key={index}>{`${msg?.username || ""} : ${msg?.message || ""}`}</p>
        ))}
      </div>
      <form
        className="mt-[20px] flex gap-[5px]"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          required
          className="w-[100px] rounded-[5px] border border-black p-[5px]"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="닉네임"
        />
        <input
          type="text"
          required
          className="w-[200px] rounded-[5px] border border-black p-[5px]"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="메시지"
        />
        <button
          disabled={!username || !message}
          className={`h-[36px] w-[100px] rounded-[10px] ${!username || !message ? "bg-gray-400" : "bg-black"} text-white`}
          type="submit"
          onClick={handleSendMessage}
        >
          보내기
        </button>
      </form>
    </section>
  );
}
