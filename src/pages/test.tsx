import { useState, useEffect } from "react";
import supabase from "@/lib/supabase"; // 引入 Supabase 客戶端

export default function TestPage() {
  const [status, setStatus] = useState<string>(""); // 用來存儲操作結果的狀態

  useEffect(() => {
    const testInsert = async () => {
      const { data, error } = await supabase
        .from("Post")
        .insert([{ author: "Test Author", body: "This is a test post" }]);

      if (error) {
        console.error("Insert error:", error);
        setStatus(`Error: ${error.message}`); // 更新狀態顯示錯誤訊息
      } else {
        console.log("Insert success:", data);
        setStatus("Success: Data inserted successfully!"); // 更新狀態顯示成功訊息
      }
    };

    testInsert();
  }, []);

  return (
    <div>
      <h1>Test Supabase Insert</h1>
      <p>Check the console for the result of the insert test.</p>
      {/* 顯示操作結果 */}
      <p>{status}</p>
    </div>
  );
}
