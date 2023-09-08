$(document).ready(function () {
    // Add an event listener for delete button clicks
    $('.delete-btn').click(function () {
      const reserveClassId = $(this).data('reserve-class-id');
  
      // Call a function to handle the delete action
      deleteReserveClass(reserveClassId);
    });
  
    // Function to delete a reserve class by reserve_class_id
    function deleteReserveClass(reserveClassId) {
        // Send an AJAX DELETE request to delete the reserve class
        $.ajax({
          url: `/api/v3/reserve_classes/${reserveClassId}`,
          type: 'DELETE',
          success: function (data) {
            // Handle success response
            // You can remove the deleted row from the table or display a success message
            console.log(data);
      
            // Show a success message to the user
            showSuccessMessage('Reserve class deleted successfully');
      
            // Optional: Reload the page or update the table
            // window.location.reload(); // Reload the page
          },
          error: function (xhr, status, error) {
            // Handle error response
            // You can display an error message or handle errors here
            console.error(xhr.responseText);
      
            // Show an error message to the user
            showErrorMessage('Failed to delete reserve class');
          },
        });
      }
      
      // Function to display a success message
      function showSuccessMessage(message) {
        // Create an alert element with a success class
        const alert = $('<div class="alert alert-success" role="alert"></div>');
        alert.text(message);
      
        // Append the alert to a container (e.g., a div with the id "messages")
        $('#messages').empty().append(alert);
      
        // Automatically hide the success message after a few seconds (optional)
        setTimeout(function () {
          alert.fadeOut(500, function () {
            $(this).remove();
          });
        }, 3000); // 3000 milliseconds (3 seconds)
      }
      
      // Function to display an error message
      function showErrorMessage(message) {
        // Create an alert element with an error class
        const alert = $('<div class="alert alert-danger" role="alert"></div>');
        alert.text(message);
      
        // Append the alert to a container (e.g., a div with the id "messages")
        $('#messages').empty().append(alert);
      }
      
  });
  