// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

function DateConversion (DateString){       //helper function converts (str date) to (num array)
    const DateArray = DateString.split('-').map(Number)
    return DateArray 
}


function getLearnerData(course, ag, submissions) {
  // here, we would process this data to achieve the desired result.
  current_id = submissions[0].learner_id
  let learnerGrade =0
  let assignmentGrade = 0
  const classId = ag.assignments

  for (let i of submissions){       //for obj i of submissions

    matchingAssignment = ag.assignments.find(assignments => assignments.id === i.assignment_id)

    // for (j in of ag){

    //     }
    // console.log( i.submission.submitted_at)
    sDate = DateConversion(i.submission.submitted_at)
    aDate = DateConversion(matchingAssignment.due_at)
    console.log(sDate,aDate)
    

    
    if (current_id ==i.learner_id ){     //compares global current id to local id
        learnerGrade += i.submission.score      //adds learners score to global score
        assignmentGrade+=matchingAssignment.points_possible
        avg = learnerGrade/assignmentGrade

    }
    // console.log(i.assignment_id)
    // console.log(ag.assignments.find(assignments => assignments.id === i.assignment_id).points_possible) 
    // console.log(avg)

    // console.log(learnerGrade)
//     AssignmentGrade = 
//     console.log(learnerGrade)
    // for (i of submissions){
    //     if (i.learner_id = c)
    // }
    // for (i of submissions){
    //     tot +=i.submission.score

    // }
  }




//   return result;


 }
const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

// console.log(result);

// const result = [
//     {
//       id: 125,
//       avg: 0.985, // (47 + 150) / (50 + 150)
//       1: 0.94, // 47 / 50
//       2: 1.0 // 150 / 150
//     },
//     {
//       id: 132,
//       avg: 0.82, // (39 + 125) / (50 + 150)
//       1: 0.78, // 39 / 50
//       2: 0.833 // late: (140 - 15) / 150
//     }
//   ];

//   return result;
