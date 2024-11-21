// don't worry about this
import { Book } from '@/types';

const BookComponent = ({
  results,
}: {
  results: Book[];
}) => {
  return results.length === 0 ? (
    <div>Nothing found</div>
  ) : (
    <>
      {results.map((item: Book,index: number) => (
        <div key={index}>
          <div>{item.Title}</div>
          <div>
            By <b>{item.Author}</b> ISBN: &bull; {item.ISBN}
          </div>
        </div>
      ))}
    </>
  );
};

export { BookComponent };
