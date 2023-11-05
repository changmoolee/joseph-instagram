import ColorButton from "@/components/ColorButton/ColorButton.component";
import ProfileImage from "@/components/ProfileImage/ProfileImage.component";

export default function NewPost() {
  return (
    <main className="w-full h-full flex justify-center items-center">
      <section className="w-[600px] h-full flex flex-col items-center mt-5">
        <div>
          <ProfileImage src="/" />
        </div>
        <div>
          <textarea placeholder="Write a caption..." />
        </div>
        <ColorButton text="Publish" />
      </section>
    </main>
  );
}
