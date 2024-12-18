type Params = {
  params: {
    time: string;
    cmt: string;
  };
};

export function generateStaticParams() {
  return ['morning', 'afternoon', 'evening', 'night'].map((time) => ({ time }));
}

export default function Time({ params: { time, cmt } }: Params) {
  return (
    <>
      Good {time}~ comment: <span className='text-red-400'>{cmt}</span>
    </>
  );
}
