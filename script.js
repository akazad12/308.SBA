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
function DateValidation (studentDate,subDate){ //validates if submission is on time or too early or late

    // Converts the student submission and the assignment submission dates to arrays
    studentDate = DateConversion(studentDate);
    subDate = DateConversion(subDate);

    
    for (let i = 0;i<studentDate.length;i++){
        if (studentDate[i]>subDate[i] ){
            return 'Late';
        }
        if (subDate[0]>studentDate[0]){
            return 'Early'
        }
    }
    return true
}


function getLearnerData(course, ag, submissions) {
  // here, we would process this data to achieve the desired result.
//   current_id = submissions[tag].learner_id
  let learnerGrade =0
  let assignmentGrade = 0
  const classId = ag.assignments
  object = []
  for (let i of submissions){       //for obj i of submissions

    current_id = i.learner_id
    matchingAssignment = ag.assignments.find(assignments => assignments.id === i.assignment_id)
    userObject = object.find(s => s.id === current_id)

    sDate = (i.submission.submitted_at)
    aDate = (matchingAssignment.due_at)
    flag = DateValidation(sDate,aDate)

    if (!userObject){
        console.log('student Not found')
        userObject ={}
    }
     if (current_id ==i.learner_id && flag!='Early'){

          //compares global current id to local id
        learnerGrade = i.submission.score 
        assignmentGrade = matchingAssignment.points_possible
        if (flag == false){
            assignmentGrade -=10
        }
        assignGrade = learnerGrade/assignmentGrade
        learnerGrade += learnerGrade      //adds learners score to global score
        assignmentGrade+=assignmentGrade
        avg = learnerGrade/assignmentGrade

         
        x= i.assignment_id

        userObject.id = current_id
        userObject.avg = avg
        userObject[x] = assignGrade
        object.push(userObject)
        // console.log(userObject)

    }
    console.log(userObject)
  }

     console.log(object)

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
