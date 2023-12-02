const transcribe = async (reqURL: string): Promise<(string | null)[]> => {
  try {
    const res = await fetch("/edge/transcribe" + reqURL);
    const data = await res.json();
    return [data.output, null];
  } catch (err: any) {
    console.error(err);
    return [null, err.message];
  }
};

export default transcribe;
