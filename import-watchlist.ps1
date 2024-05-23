# Define the source and destination folders
$sourceFolder = "E:\Documents\Sites\info-landing-page\watchlist"
$destinationFolder = "E:\Documents\Sites\GitHub\anderwolfe.github.io\watchlist"

# Check if the destination folder exists
if (Test-Path $destinationFolder) {
    # Get all files and subfolders in the destination folder and remove them
    Get-ChildItem -Path $destinationFolder -Recurse | Remove-Item -Force -Recurse
} else {
    # If the destination folder does not exist, create it
    New-Item -Path $destinationFolder -ItemType Directory
}

# Copy files from the source folder to the destination folder
Copy-Item -Path "$sourceFolder\*" -Destination $destinationFolder -Recurse

echo "Import Successful"
pause