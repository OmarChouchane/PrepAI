import { RouteParams } from '@/types'
import React from 'react'
import { GetFeedbackByInterviewId, getInterviewById } from '@/lib/actions/general.action'
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/actions/auth.action';

const page = async ({ params }: RouteParams) => {

  const { id } = await params;
  const user = await getCurrentUser();
  const interview = await getInterviewById(id);

  if(!interview || !user?.id) redirect('/');

  const feedback = await GetFeedbackByInterviewId({ interviewId: id, userId: user.id });

  return (
    <div>
      
    </div>
  )
}

export default page
