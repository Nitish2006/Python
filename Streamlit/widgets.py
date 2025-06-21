import streamlit as st
import pandas as pd
st.title("Streamlit Input")
s=st.text_input('enter your name')
age=st.slider("select your age",0,100,25)
st.write(f"Your age is{age}.")
op=['Python','Java','C++',"Js"]
choice=st.selectbox("Choose your programming lan",op)
st.write(f"You selected {choice}")
if s:
    st.write(f"Hello ,{s}.")

df=pd.DataFrame(
    {
        "first":[1,2,3,4],
        "second":[10,20,30,40]
    }
)
st.write("Here is your dataframe")
st.write(df)
uploaded_file=st.file_uploader("Choose a file",type='csv')
if uploaded_file is not None:
    d=pd.read_csv(uploaded_file)
st.write(d)