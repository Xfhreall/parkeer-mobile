import Loading from "@/components/ui/loading";
import Login from "./(auth)/login/page";

export default function Home() {
  return (
    <>
      <Loading />
      <Login />
    </>
  );
}
