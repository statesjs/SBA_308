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
      due_at: Date, // string,
      // the maximum points possible for the assignment
      points_possible: 100,
    },
    {
      id: 2,
      name: "BootStrap",
      // the due date for the assignment
      due_at: Date, // string,
      // the maximum points possible for the assignment
      points_possible: 100,
    },
    {
      id: 3,
      name: "HTML SBA",
      // the due date for the assignment
      due_at: Date, // string,
      // the maximum points possible for the assignment
      points_possible: 500,
    },
  ],
};

//learner submission group
const LearnerSubmission = [
  {
    learner_id: 314,
    assignment_id: 1,
    submission: {
      submitted_at: Date, //string,
      score: 90,
    },
  },
  {
    learner_id: 314,
    assignment_id: 2,
    submission: {
      submitted_at: Date, //string,
      score: 30,
    },
  },
  {
    learner_id: 314,
    assignment_id: 3,
    submission: {
      submitted_at: Date, //string,
      score: 480,
    },
  },
  {
    learner_id: 253,
    assignment_id: 1,
    submission: {
      submitted_at: Date, //string,
      score: 20,
    },
  },
  {
    learner_id: 253,
    assignment_id: 2,
    submission: {
      submitted_at: Date, //string,
      score: 100,
    },
  },
  {
    learner_id: 253,
    assignment_id: 3,
    submission: {
      submitted_at: Date, //string,
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
  //array that holds results
  let outputLearner = [];
  let learnerSet = new Set(); //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add
  //part 1 amke sure the id matches, otherwise throw an error
  if (AssignmentGroup.course_id !== CourseInfo.id) {
    throw new Error(
      `This assignment isn't for this class! Change the Course you're submitting to!`
    );
  }
  //find how many unique keys, put spit out that many
  for (let i = 0; i < LearnerSubmission.length; i++) {
    learnerSet.add(LearnerSubmission[i].learner_id);
  }
  console.log(learnerSet);
  //learner set is now an array holding the unique keys
  //plug in objs to outputlearner (dynamically made so any amount of learners in compensated for)
  //also added an avg key to take in a future value
  outputLearner = Array.from(learnerSet).map((id) => ({
    learner_id: id,
    avg: 0, //replace with a function
    sum: 0,
    //add a key that will hold the assignemnts turned in
  }));
  return outputLearner;
}
//make a function to push all the assignments associated with the learner into their final student obj
function assignmentsOfLearner(AssignmentGroup, final) {
  for (let i = 0; i < final.length; i++) {
    final[i].assignments = AssignmentGroup.assignments;
  }
  return final;
}
//use to get the sum total score for each learner id and push it to final
function getSum(LearnerSubmission, final) {
  for (let i = 1; i < LearnerSubmission.length; i++) {
    if (LearnerSubmission[i].learner_id == final[0].learner_id) {
      final[0].sum += LearnerSubmission[i].submission.score;
    } else if (LearnerSubmission[i].learner_id == final[1].learner_id) {
      final[1].sum += LearnerSubmission[i].submission.score;
    }
  }
  return final;
}

let final = getLearnerData(LearnerSubmission);
getSum(LearnerSubmission, final);
assignmentsOfLearner(AssignmentGroup, final);
console.log(final);
console.log(final[0].learner_id);

//start working on function that will add the sum of scores
//then add the sums of total possible scores and finally divide
//function should exist within the outputlearner as a value to a avg key
//
//
// function avgScore (assignmentgroup, outputLearner){
// for (let i = 0; i < LearnerSubmission.length; i++) {
//     if (LearnerSubmission[i].learner_id == outputLearner[i].)
// }
// }
