// pages/test.tsx
import { useEffect } from "react";
import supabase from "@/lib/supabase"; // 引入 Supabase 客戶端

export default function TestPage() {
  useEffect(() => {
    const testInsert = async () => {
      const { data, error } = await supabase
        .from("Post")
        .insert([{ author: "Test Author", body: "This is a test post" }]);

      if (error) {
        console.error("Insert error:", error);
      } else {
        console.log("Insert success:", data);
      }
    };

    testInsert();
  }, []);

  return (
    <div>
      <h1>Test Supabase Insert</h1>
      <p>Check the console for the result of the insert test.</p>
    </div>
  );
}
