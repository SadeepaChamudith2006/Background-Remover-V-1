 let processedImage = null;

    async function removeBackground() {
        const fileInput = document.getElementById('imageUpload').files[0];
        
        if (!fileInput) {
            alert("Please upload an image first!");
            return;
        }

        // Show loading message and hide other elements
        document.getElementById('loadingMessage').style.display = "block";
        document.getElementById('removeBtn').style.display = "none";
        document.getElementById('downloadBtn').style.display = "none";
        document.getElementById('successMessage').style.display = "none";
        document.getElementById('imagePreview').style.display = "none";

        // Prepare the API request
        const formData = new FormData();
        formData.append("image_file", fileInput);
        formData.append("size", "auto");

        try {
            const response = await fetch("https://api.remove.bg/v1.0/removebg", {
                method: "POST",
                headers: {
                    "X-Api-Key": "VcmUTu7t26tvSHC49bZYHLev"  // Your Remove.bg API key
                },
                body: formData
            });

            if (!response.ok) throw new Error("Background removal failed");

            const blob = await response.blob();
            processedImage = URL.createObjectURL(blob); // Create URL for processed image

            // Hide loading message, show success message, image preview, and download button
            document.getElementById('loadingMessage').style.display = "none";
            document.getElementById('successMessage').style.display = "block";
            document.getElementById('imagePreview').src = processedImage;
            document.getElementById('imagePreview').style.display = "block";
            document.getElementById('downloadBtn').style.display = "inline-block";

        } catch (error) {
            alert("Error: " + error.message);
            document.getElementById('loadingMessage').style.display = "none";
            document.getElementById('removeBtn').style.display = "inline-block";
        }
    }

    function downloadImage() {
        if (!processedImage) return;

        const link = document.createElement('a');
        link.href = processedImage;
        link.download = 'background-removed.png';
        link.click();
    }