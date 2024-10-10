import { auth } from '@clerk/nextjs/server';
import ChurchForm from '../_components/home/church-form';

export default function Create() {
  const { userId } = auth();

  return (
    <ChurchForm userId={userId!} />

  )
}