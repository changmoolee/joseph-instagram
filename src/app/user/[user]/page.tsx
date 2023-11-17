import ColorButton from "@/components/ColorButton/ColorButton.component";
import BigProfileImage from "@/components/ProfileImage/BigProfileImage.component";
import Tab from "@/components/Tab/Tab.component";

export default function User() {
  const tabs = ["POSTS", "SAVED", "LIKED"];

  return (
    <main className="w-full h-full flex flex-col items-center">
      <div className="w-[500px] h-[200px] flex gap-10 p-5">
        <BigProfileImage src="/" />
        <section className="flex flex-col gap-3">
          <article className="flex gap-5 items-center">
            <span>name</span>
            <ColorButton
              text="Follow"
              className="h-[30px] p-3 bg-sky-400 rounded-md"
            />
          </article>
          <article className="flex gap-5">
            <span>
              <span className="font-bold">2</span> Posts
            </span>
            <span>
              <span className="font-bold">2</span> followers
            </span>
            <span>
              <span className="font-bold">1</span> following
            </span>
          </article>
          <article>
            <span className="font-bold">name</span>
          </article>
        </section>
      </div>
      <Tab tabArr={tabs} />
    </main>
  );
}
