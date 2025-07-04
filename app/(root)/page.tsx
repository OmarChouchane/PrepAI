import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { dummyInterviews } from "@/constants";
import  InterviewCard  from "@/components/InterviewCard";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getInterviewsByUserId, GetLatestInterviews} from "@/lib/actions/general.action";
// Import Interview type (adjust the path if needed)
import type { Interview } from "@/types";

const page = async () => {

  const user = await getCurrentUser();
  

  const [userInterviews, latestInterviews] = await Promise.all([
    getInterviewsByUserId(user?.id ?? ""),
    GetLatestInterviews({ userId: user?.id ?? "" }),
  ]);

  const hasPastInterviews = userInterviews && userInterviews.length > 0;
  const hasUpcomingInterviews = latestInterviews && latestInterviews.length > 0;


  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
          <p className="text-lg">
            Practice on real interview questions & get instant feedback
          </p>
          <Button asChild className="btn-primary max-sm:w-full">
            <Link href={"/interview"}>Start an Interview</Link>
          </Button>
        </div>

        <Image
          src="/robot.png"
          alt="robot"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>

        {hasPastInterviews ? (
          <div className="interviews-section">
            {userInterviews.map((interview: Interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))}
          </div>
        ) : (
          <p>You haven&apos;t taken any interviews yet.</p>
        )}
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Take an Interview</h2>

        {hasUpcomingInterviews
         ? (
          <div className="interviews-section">
            {latestInterviews.map((interview: Interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))}
          </div>
        ) : (
          <p> There are no interviews available.</p>
        )}
      </section>
    </>
  );
};

export default page;
