import { useEffect } from "react";
import supabase from "@/lib/supabase";

export default function TestSupabase() {
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("Post").select("*").limit(5);

      if (error) {
        console.error("Supabase error:", error);
      } else {
        console.log("Supabase data:", data);
      }
    };

    fetchData();
  }, []);

  return <div>Check console for Supabase test result.</div>;
}
