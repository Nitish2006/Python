import streamlit as st
import os

# Base class
class Animal:
    def __init__(self, director_name, actor_name, role):
        self.role = role
        self.director_name = director_name
        self.actor_name = actor_name

    def get_appearance(self):
        return f"{self.actor_name} plays the role of {self.role} in a movie directed by {self.director_name}."

# Child class with method overriding
class Scene(Animal):
    def __init__(self, director_name, actor_name, role, scene_name):
        super().__init__(director_name, actor_name, role)
        self.scene_name = scene_name

    # Overriding method for Streamlit output
    def get_appearance(self):
        return f"🎬 A breathtaking moment! {self.actor_name} transforms into {self.role} in the dramatic scene '{self.scene_name}', under the vision of {self.director_name}. What an unforgettable performance!"

# Streamlit UI
st.title("🎥 Movie Scene Player")
st.subheader("Enter Scene Details:")

# Input fields
director_name = st.text_input("🎬 Director's Name", "Sandeep Reddy Vanga")
actor_name = st.text_input("🎭 Actor's Name", "Bobby Deol")
role = st.text_input("🎭 Role", "Abrar")
scene_name = st.text_input("🎬 Scene Name", "Wedding's Scene 🍷")

# Fixed Video Path (Windows)
video_path = "E:\Code\oops\SSYouTube.online_ANIMAL_ ABRAR’S ENTRY - JAMAL KUDU(Full Video) _Ranbir Kapoor,Bobby Deol _Sandeep Vanga _Bhushan K_720p.mp4"
# Verify if the video file exists
if os.path.exists(video_path):
    st.subheader("📽️ Scene Video")
    st.video(video_path)  # Automatically plays the predefined video file
else:
    st.error("⚠️ Video file not found! Check the file path.")

# Generate scene description
if st.button("Generate Scene"):
    if not director_name or not actor_name or not role or not scene_name:
        st.error("⚠️ Please fill in all the details before proceeding!")
    else:
        scene = Scene(director_name, actor_name, role, scene_name)
        st.success(scene.get_appearance())  # Show message
