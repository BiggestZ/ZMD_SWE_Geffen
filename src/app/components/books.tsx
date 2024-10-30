
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
      {results.map((item: Book, index: number) => (
        <div key={index}>
          <div>{item.title}</div>
          <div>
            By <b>{item.author}</b> ISBN: &bull; {item.isbn}
          </div>
        </div>
      ))}
    </>
  );
};

export { BookComponent };
