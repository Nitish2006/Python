import streamlit as st
import numpy as np
import pandas as pd
# title
st.title("Hello streamlit")

df=pd.DataFrame(
    {
        "first":[1,2,3,4],
        "second":[10,20,30,40]
    }
)
st.write("Here is your dataframe")
st.write(df)
#streamlit chart
chart_data=pd.DataFrame(
    
        np.random.randn(20,3),columns=['a','b','c']
    
)
st.line_chart(chart_data)