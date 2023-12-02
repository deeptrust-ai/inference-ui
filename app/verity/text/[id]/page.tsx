interface IPageProps {
  params: { id: string };
}

export default function Page({ params }: IPageProps) {
  const { id } = params;

  return (
    <div>
      <p>Verity page {id}</p>
    </div>
  );
}
