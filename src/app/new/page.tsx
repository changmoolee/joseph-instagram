import ColorButton from "@/components/ColorButton/ColorButton.component";
import DragAndDrop from "@/components/DragAndDrop/DragAndDrop.component";
import ProfileAndName from "@/components/ProfileAndName/ProfileAndName.component";
import Textarea from "@/components/Textarea/Textarea.component";

export default function NewPost() {
  return (
    <main className="w-full h-full flex justify-center items-center">
      <section className="w-[600px] h-full flex flex-col items-center mt-5">
        <ProfileAndName src="/" name="wow" />
        <DragAndDrop />
        <Textarea placeholder="Write a capiton..." />
        <ColorButton text="Publish" className="w-full h-[60px] bg-sky-400" />
      </section>
    </main>
  );
}
