import {Input} from '@/components/forms/inputs';
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* a form that ask for name, gender date of birth , occupation, role, and social hanlde  */}
      <form className="flex flex-col items-center justify-center space-y-4">
        <Input label="Name" placeholder="John Doe" id="name" />
        <Input icon="@" id='dob' label='Date of Birth' type='date' />
      </form>
    </main>
  );
}
