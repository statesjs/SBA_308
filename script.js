//courseinfo obj
const CourseInfo = {
  id: 666,
  name: "MERN SWE",
};

//assignmentgroup obj
const AssignmentGroup = {
  id: 2343,
  name: "HTML & CSS",
  // the ID of the course the assignment group belongs to
  course_id: 666,
  // the percentage weight of the entire assignment group
  group_weight: 50,
  assignments: [
    //assignment info obj nested in assignment group
    {
      id: 1,
      name: "Fundamentals",
      // the due date for the assignment
      due_at: new Date("2025-02-1"), // string,
      // the maximum points possible for the assignment
      points_possible: 100,
    },
    {
      id: 2,
      name: "BootStrap",
      // the due date for the assignment
      due_at: new Date("2025-02-28"), // string,
      // the maximum points possible for the assignment
      points_possible: 100,
    },
    {
      id: 3,
      name: "HTML SBA",
      // the due date for the assignment
      due_at: new Date("2025-02-10"), // string,
      // the maximum points possible for the assignment
      points_possible: 500,
    },
    {
      id: 4,
      name: "How to make an alien planet",
      // the due date for the assignment
      due_at: new Date("2029-02-10"), // string,
      // the maximum points possible for the assignment
      points_possible: 1110000,
    },
  ],
};

//learner submission group
const LearnerSubmission = [
  {
    learner_id: 314,
    assignment_id: 1,
    submission: {
      submitted_at: new Date("2025-02-2"),
      score: 90,
    },
  },
  {
    learner_id: 314,
    assignment_id: 2,
    submission: {
      submitted_at: new Date("2025-02-17"),
      score: 30,
    },
  },
  {
    learner_id: 314,
    assignment_id: 3,
    submission: {
      submitted_at: new Date("2025-02-10"),
      score: 480,
    },
  },
  {
    learner_id: 253,
    assignment_id: 1,
    submission: {
      submitted_at: new Date("2025-03-1"),
      score: 20,
    },
  },
  {
    learner_id: 253,
    assignment_id: 2,
    submission: {
      submitted_at: new Date("2025-03-17"),
      score: 100,
    },
  },
  {
    learner_id: 253,
    assignment_id: 3,
    submission: {
      submitted_at: new Date("2025-03-10"),
      score: 380,
    },
  },
];

// const outputSample {
//     // the ID of the learner for which this data has been collected
//     "id": number,
//     // the learner’s total, weighted average, in which assignments
//     // with more points_possible should be counted for more
//     // e.g. a learner with 50/100 on one assignment and 190/200 on another
//     // would have a weighted average score of 240/300 = 80%.
//     "avg": number,
//     // each assignment should have a key with its ID,
//     // and the value associated with it should be the percentage that
//     // the learner scored on the assignment (submission.score / points_possible)
//     <assignment_id>: number,
//     // if an assignment is not yet due, it should not be included in either
//     // the average or the keyed dictionary of scores
// }

function getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmission) {
  try {
    //checking ids match b/w the assignmentgroup and courseinfo
    if (AssignmentGroup.course_id !== CourseInfo.id) {
      throw new Error(
        `This assignment isn't for this class! Change the Course you're submitting to!`
      );
    }
    //used set to create a way to dynamically take it a random number of
    //students, by allowing only unique student ids, couldnt really think of a way
    //to unique catch ids besides this
    let outputLearner = [];
    let learnerSet = new Set();

    for (let submission of LearnerSubmission) {
      learnerSet.add(submission.learner_id);
    }
    //working off how sets work, using forEach to create a new object into
    //outputlearner to build into and off of as a "mock object"
    for (let learnerId of learnerSet) {
      outputLearner.push({
        id: learnerId,
        avg: 0,
      });
    }

    //after i realized i needed to work my functions into one another,
    //i realized i could start with created a sum and total possible variable
    //as it goes thru a loop holding onto each spot in the iteration
    //and uniquely calculate their matching scores and output them.
    //this took a while since the idea of moving sides ways thru an array and
    //"up and down" an object, completeing that object then moving onto the next index still
    //feels awkward to me
    for (let i = 0; i < outputLearner.length; i++) {
      let learner = outputLearner[i];
      let sum = 0;
      let totalPossible = 0;

      for (let j = 0; j < AssignmentGroup.assignments.length; j++) {
        let assignment = AssignmentGroup.assignments[j];
        let foundSubmission = false;
        //checking if they submitted the assignment
        for (let k = 0; k < LearnerSubmission.length; k++) {
          let submission = LearnerSubmission[k];

          if (
            submission.learner_id === learner.id &&
            submission.assignment_id === assignment.id
          ) {
            //if it was found, we converted into new date objects and
            //then checked for late submissions
            foundSubmission = true;

            let score = submission.submission.score;
            let dueDate = new Date(assignment.due_at);
            let submittedDate = new Date(submission.submission.submitted_at);
            //here we modified the score if late
            if (submittedDate > dueDate) {
              score -= assignment.points_possible * 0.1;
            }
            // assigning the score to each learner and adding to their
            let percentage = score / assignment.points_possible;
            learner[assignment.id] = percentage;
            sum += score;
            totalPossible += assignment.points_possible;
            // theres no need to keep looping thru once it gets to the matching id,
            break;
          }
        }
      }
      // accounting for the possibility the points possible is 0
      //also to assign the avg to learner
      if (totalPossible > 0) {
        learner.avg = ((sum / totalPossible) * 100).toFixed(2) + "%";
        //not the format wanted but if we wanted to change back to a number,
        // i would just leave out the * 100 and not concat the %. but it just looked nicer tbh
      }
    }

    return outputLearner;
    //finally a catch statement with a
  } catch (error) {
    throw error;
  }
}
//set the function value to a variable and finally logging the variable
const Final = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmission);
console.log(Final);

// ⚠️⚠️⚠️⚠️⚠️⚠️ steps to do:
//work on late submission functionality
//put in a try catch
//Use strings, numbers, and Boolean values cached within variables
//Utilize at least one loop control keyword such as break or continue.
//check if you named variables correctly and correct vars are used
