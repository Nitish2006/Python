from logger import logging
def add(a,b):
    logging.debug('The addition is going on')
    return a+b
logging.debug('add done')
add(10,12)