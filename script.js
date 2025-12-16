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

function DateConversion(DateString) {       //helper function converts (str date) to (num array)
     if (typeof DateString !== 'string'){
        throw new Error('Date is not in string format');
}
    const DateArray = DateString.split('-').map(Number);
    if (DateArray.length!=3){
        throw new Error('Date format is incorrect');
    }
    return DateArray;
}
function DateValidation(studentDate, subDate) { //validates if submission is on time or too early or late

    // Converts the student submission and the assignment submission dates to arrays
    studentDate = DateConversion(studentDate);
    subDate = DateConversion(subDate);


    for (let i = 0; i < studentDate.length; i++) {
        if (studentDate[i] > subDate[i]) {
            return 'Late';
        }
        if (subDate[0] > studentDate[0]) {
            return 'Early';
        }
    }
    return true;
}


function getLearnerData(course, ag, submissions) {
    try { //Exception Handling
        if (course.id!=ag.course_id){ // Throw error if courseInfo ID and assignmentGroup ID are mismatched
            throw new Error(`Assignment Group does not belong to course, mismatch IDs`);
        }
        // here, we would process this data to achieve the desired result
        let learnerGrade = 0;
        let assignmentGrade = 0;
        let assignGrade = 0;
        let learnerSumGrade = 0;
        let assignmentSumGrade = 0;
        const classId = ag.assignments;
        output = [];
        for (let i of submissions) { 

            current_id = i.learner_id
             matchingAssignment = ag.assignments.find(assignments => assignments.id === i.assignment_id)
            if (!matchingAssignment){
                throw new Error(`Assignment ID ${i.assignment_id} does not exist`)
            }
            let userObject = output.find(s => s.id === current_id)

            let sDate = i.submission.submitted_at
            let aDate = matchingAssignment.due_at
            let flag = DateValidation(sDate, aDate)

            if (!userObject) {
                userObject = {}
                output.push(userObject)
                assignmentSumGrade = 0
                learnerSumGrade = 0
            }
            if (current_id == i.learner_id && flag != 'Early') {

                //compares global current id to local id
                learnerGrade = i.submission.score
                if (matchingAssignment.points_possible<=0){
                    throw new Error(`Possible points for assignment cannot be 0 or lower`)
                }
                 assignmentGrade = matchingAssignment.points_possible
                if (flag == 'Late') {
                    learnerGrade -= (assignmentGrade * .10)
                }
                // console.log('---------',learnerGrade,assignmentGrade,learnerGrade/assignmentGrade,'--------')
                assignGrade = learnerGrade / assignmentGrade
                learnerSumGrade += learnerGrade      //adds learners score to global score
                assignmentSumGrade += assignmentGrade
                avg = learnerSumGrade / assignmentSumGrade

                let userAssignment = i.assignment_id;

                userObject.id = current_id;
                userObject.avg = avg;
                userObject[userAssignment] = assignGrade;

            }

        }
        return output;
    } catch (err) {
        console.log(`Error: ${err.message}`);
    }

}




const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(result);

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
