import streamlit as st
import pandas as pd
from sklearn.datasets import load_iris
from sklearn.ensemble import RandomForestClassifier

# Load data with caching
@st.cache
def load_data():
    iris = load_iris()
    df = pd.DataFrame(iris.data, columns=iris.feature_names)
    df['species'] = iris.target
    return df, iris

# Load the data and target names
df, iris = load_data()

# App title
st.title("Iris Flower Species Prediction")

# Sidebar inputs for features
st.sidebar.header("Input Features")
sepal_length = st.sidebar.slider('Sepal length (cm)', float(df['sepal length (cm)'].min()), float(df['sepal length (cm)'].max()), float(df['sepal length (cm)'].mean()))
sepal_width = st.sidebar.slider('Sepal width (cm)', float(df['sepal width (cm)'].min()), float(df['sepal width (cm)'].max()), float(df['sepal width (cm)'].mean()))
petal_length = st.sidebar.slider('Petal length (cm)', float(df['petal length (cm)'].min()), float(df['petal length (cm)'].max()), float(df['petal length (cm)'].mean()))
petal_width = st.sidebar.slider('Petal width (cm)', float(df['petal width (cm)'].min()), float(df['petal width (cm)'].max()), float(df['petal width (cm)'].mean()))

# User input DataFrame
input_data = pd.DataFrame({
    'sepal length (cm)': [sepal_length],
    'sepal width (cm)': [sepal_width],
    'petal length (cm)': [petal_length],
    'petal width (cm)': [petal_width]
})

# Train model
clf = RandomForestClassifier()
clf.fit(df[iris.feature_names], df['species'])

# Make prediction
prediction = clf.predict(input_data)
predicted_species = iris.target_names[prediction[0]]

# Display prediction
st.subheader("Prediction")
st.write(f"The predicted Iris species is **{predicted_species}**.")

# Optional: Show the input and data
st.subheader("User Input Features")
st.write(input_data)

st.subheader("Iris Dataset Sample")
st.write(df.head())
