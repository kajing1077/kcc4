type Params = {
  params: {
    time: string;
  };
  searchParams: {
    q: string;
  };
};

export function generateStaticParams() {
  return ['morning', 'afternoon', 'evening', 'night'].map((time) => ({ time }));
}

export default function Time({
  params: { time },
  searchParams: { q },
}: Params) {
  return (
    <>
      Good {time}~ <span className='text-red-400'>{q}</span>
    </>
  );
}
