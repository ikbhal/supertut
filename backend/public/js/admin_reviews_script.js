function extractTeacherIdFromUrl(url) {
  const parts = url.split('/');
  return parts[parts.length - 2];
}


$(document).ready(function () {

  const teacherId = extractTeacherIdFromUrl(window.location.pathname);
  console.log("teacher id at client ", teacherId); // Output: 1


  // Review Form Submission
  $('#reviewForm').on('submit', function (event) {
    event.preventDefault();
    const formData = {
      reviewedBy: $('#reviewedBy').val(),
      text: $('#reviewText').val(),
      rating: $('#reviewRating').val()
    };
    $.ajax({
      url: `/api/v2/teachers/${teacherId}/reviews`,
      method: 'POST',
      data: JSON.stringify(formData),
      contentType: 'application/json',
      success: function (response) {
        showAlert('success', 'Review added successfully.');
        // $('#reviewList').append(buildReviewRow(response.review)); 
        // TODO reload the page or add review formData some how
      },
      error: function (xhr, status, error) {
        showAlert('danger', 'Error adding review.');
      }
    });
  });

  // Review Deletion
  $(document).on('click', '.delete-btn', function () {
    const reviewId = $(this).data('review-id');
    $.ajax({
      url: `/api/v2/teachers/${teacherId}/reviews/${reviewId}`,
      method: 'DELETE',
      success: function (response) {
        showAlert('success', 'Review deleted successfully.');
        $(`#review-${reviewId}`).remove();
      },
      error: function (xhr, status, error) {
        showAlert('danger', 'Error deleting review.');
      }
    });
  });

  // Helper function to show alert messages
  function showAlert(type, message) {
    $('#alert-container').html(`<div class="alert alert-${type}" role="alert">${message}</div>`);
    setTimeout(function () {
      $('#alert-container').empty();
    }, 3000);
  }

  // Helper function to build review row HTML
  function buildReviewRow(review) {
    return `
      <tr id="review-${review.id}">
        <td>${review.id}</td>
        <td>${review.reviewedBy}</td>
        <td>${review.text}</td>
        <td>
          <button class="btn btn-danger delete-btn" data-review-id="${review.id}">Delete</button>
        </td>
      </tr>
    `;
  }

  // Fetch and populate initial reviews
  $.ajax({
    url: `/api/v2/teachers/${teacherId}/reviews`,
    method: 'GET',
    success: function (response) {

      if(response == null || response.length == 0){
        showAlert('info', 'no reviews');
        return ;
      }
      response.forEach(function (review) {
        $('#reviewList').append(buildReviewRow(review));
      });
    },
    error: function (xhr, status, error) {
      showAlert('danger', 'Error fetching reviews.');
    }
  });
});
