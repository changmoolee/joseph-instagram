import ProfileCard from "@/components/ProfileCard/ProfileCard.component";
import SearchInput from "@/components/SearchInput/SearchInput.component";

interface ISearchProps {
  datalist: [];
}

/**
 * 검색 페이지
 */
export default function Search(props: ISearchProps) {
  // props
  const { datalist = [1, 2, 3] } = props;

  return (
    <main className="w-full h-full flex justify-center items-center">
      <div className="w-[600px] h-full flex flex-col items-center mt-5">
        <SearchInput />
        <section className="w-full h-[auto] flex flex-col p-5 gap-3">
          {datalist.map((data) => (
            <ProfileCard key={data} />
          ))}
        </section>
      </div>
    </main>
  );
}
