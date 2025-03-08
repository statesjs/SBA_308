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
      due_at: Date("2025-02-1"), // string,
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
      due_at: Date("2025-02-10"), // string,
      // the maximum points possible for the assignment
      points_possible: 500,
    },
    {
      id: 4,
      name: "How to make an alien planet",
      // the due date for the assignment
      due_at: Date("2029-02-10"), // string,
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
      submitted_at: Date("2025-02-2"),
      score: 90,
    },
  },
  {
    learner_id: 314,
    assignment_id: 2,
    submission: {
      submitted_at: Date("2025-02-17"),
      score: 30,
    },
  },
  {
    learner_id: 314,
    assignment_id: 3,
    submission: {
      submitted_at: Date("2025-02-10"),
      score: 480,
    },
  },
  {
    learner_id: 253,
    assignment_id: 1,
    submission: {
      submitted_at: Date("2025-03-1"),
      score: 20,
    },
  },
  {
    learner_id: 253,
    assignment_id: 2,
    submission: {
      submitted_at: Date("2025-03-17"),
      score: 100,
    },
  },
  {
    learner_id: 253,
    assignment_id: 3,
    submission: {
      submitted_at: Date("2025-03-10"),
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

function getLearnerData(LearnerSubmission) {
  //array that holds results ✅
  let outputLearner = [];
  let learnerSet = new Set(); //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add
  //part 1 amke sure the id matches, otherwise throw an error
  if (AssignmentGroup.course_id !== CourseInfo.id) {
    throw new Error(
      `This assignment isn't for this class! Change the Course you're submitting to!`
    );
  }
  //find how many unique keys, put spit out that many ✅
  //updated with a for of loop instead,
  for (let submission of LearnerSubmission) {
    learnerSet.add(submission.learner_id);
  }
  console.log(learnerSet);
  //learner set is now an array holding the unique keys
  //plug in objs to outputlearner (dynamically made so any amount of learners in compensated for) 🚧
  //also added an avg key to take in a future value ✅
  //went ahead and just added the total possible and assignment keys
  outputLearner = Array.from(learnerSet).map((id) => ({
    learner_id: id,
    avg: 0, //replace with a function
    sum: 0,
    totalPossible: 0,
    assignments: {},
  }));
  return outputLearner;
}

//bunch the assignment assigner function, sum function, and avg function together
function assignmentsOfLearner(AssignmentGroup, final, LearnerSubmission) {
  for (let i = 0; i < final.length; i++) {
    for (let j = 0; j < AssignmentGroup.assignments.length; j++) {
      let assignment = AssignmentGroup.assignments[j];

      // Search through all submissions to find a matching one
      for (let k = 0; k < LearnerSubmission.length; k++) {
        if (
          LearnerSubmission[k].learner_id === final[i].learner_id &&
          LearnerSubmission[k].assignment_id === assignment.id
        ) {
          // update scores
          if (!final[i].assignments[assignment.id]) {
            final[i].assignments[assignment.id] = 0;
          }

          // get their true grade
          final[i].assignments[assignment.id] =
            LearnerSubmission[k].submission.score / assignment.points_possible;

          // add up sum and total poss to divide later
          final[i].sum += LearnerSubmission[k].submission.score;
          final[i].totalPossible += assignment.points_possible;
        }
      }
    }
  }
}

//make a function to sum total possible then divide final[x].sum and reassign final[x].avg that score
function getAvg(final) {
  for (let learner of final) {
    if (learner.totalPossible > 0) {
      learner.avg = (learner.sum / learner.totalPossible) * 100 + "%"; // Convert to percentage
    }
  }
}
let final = getLearnerData(LearnerSubmission);
assignmentsOfLearner(AssignmentGroup, final, LearnerSubmission);
getAvg(final);
console.log(final);
// ⚠️⚠️⚠️⚠️⚠️⚠️ steps to do:
//work on late submission functionality
//put in a try catch
//Use strings, numbers, and Boolean values cached within variables
//Utilize at least one loop control keyword such as break or continue.
//check if you named variables correctly and correct vars are used
