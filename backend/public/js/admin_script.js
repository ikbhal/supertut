$(document).ready(function () {
  // Handle teacher deletion
  $('.delete-teacher').click(function () {
    const teacherId = $(this).data('id');
    if (confirm('Are you sure you want to delete this teacher?')) {
      $.ajax({
        url: `/admin/teachers/${teacherId}`,
        method: 'DELETE',
        success: function (response) {
          window.location.reload();
        },
        error: function () {
          alert('Error deleting teacher.');
        }
      });
    }
  });

  // Handle teacher creation
  $('#toggleCreateTeacherForm').click(function () {
    $('#createTeacherFormWrapper').toggleClass('hidden');
  });

  $('#create-teacher-form').submit(function (e) {
    e.preventDefault();

    const formData = {
      name: $('#name').val(),
      hourlyFee: $('#hourlyFee').val(),
      responseTime: $('#responseTime').val(),
      totalStudents: $('#totalStudents').val(),
      photo: $('#photo').val(),
      title: $('#title').val(),
      about: $('#about').val(),
      aboutLesson: $('#aboutLesson').val()
    };

    $.ajax({
      url: '/api/v2/teachers',
      method: 'POST',
      data: JSON.stringify(formData),
      success: function (response) {
        alert('Teacher created successfully.');
        window.location.reload();
      },
      error: function () {
        alert('Error creating teacher.');
      }
    });
  });


  // get teacher details
  toggleTeacherDetails
  $('#toggleTeacherDetails').click(function () {
    $('#toggleTeacherDetailsWrapper').toggleClass('hidden');
  });

  $('.view-teacher').click(function (e) {
    e.preventDefault();
    const teacherId = $(this).data('teacher-id');

    $.ajax({
      url: `/api/v2/teachers/${teacherId}`,
      method: 'GET',
      dataType: 'json',
      success: function (teacher) {
        const teacherDetailsHtml = `
          <div class="card">
              <div class="card-header">${teacher.name}</div>
              <div class="card-body">
                  <p>Hourly Fee: ${teacher.hourlyFee}</p>
                  <p>Response Time: ${teacher.responseTime}</p>
                  <p>Total Students: ${teacher.totalStudents}</p>
                  <p>Photo: <img src="${teacher.photo}" alt="Teacher Photo" style="max-width: 100px;"></p>
                  <p>Title: ${teacher.title}</p>
                  <p>About: ${teacher.about}</p>
                  <p>About Lesson: ${teacher.aboutLesson}</p>
                  <!-- Add more teacher details here -->
              </div>
          </div>
      `;

        $('#teacher-details-container').html(teacherDetailsHtml);
      },
      error: function () {
        alert('Error fetching teacher details.');
      }
    });
  });


}); // end of document ready
