The hardest parts of this SBA was thinking of a way to :

- Get the result dynamically, taking in a changing number of learnerSubmissions, as well
  as changing number of unique students.

- Understand in my head, the order in which I would loop through one array, and in that same
  iteration, probe through another (ex. looping through outputLearner (only 2) while
  thropugh each iteration, checking and matching their submission

- keeping the requirements in mind

- what do i know how to do vs. what do I need to learn how to do.

  Things I learned:
  1. What are Sets and how to use methods to add to it, and most importantly their
     property to only hold only unique values.
     src : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
  2. Understanding how to display a date
     src: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date

This program uses the function "getLearnerData" to take in 3 arguements(CourseInfo, AssignmentGroup, LearnerSubmission)
and spits out an array of objects, wth each object representing a unique learner and their
scores, id, avg, and scores per assignment.

The first part of the function goes through the id of the assignment group and if it matches
the courseinfo id, and if not throws an error. After I implemented a variable holding a set
to calculate the number of unique keys being used in LearnerSubmission. As well as an array called 
outputLearner to take in their unique academic profile . From there, checking if they turned in their
assignment. Then holding their date from their respective objects and
comparing them for a boolean value  and calcing for late scores and finally pushing their score to 
their respective object.

All in all, I think the absolute hardest part wasnt getting the solution, but getting 
the solution to work in a format that adhered to the requirements and going back and forth 
when it was forgotten to implement. Overthinking came a close second, erasing past work done and
because there was a better way, but then not finishing that way because you also realize theres a better
 way than that. (tldr. I needed to make it work first, then worry about implementing requirments after.)
