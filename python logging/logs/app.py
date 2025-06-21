import logging

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S',
    handlers=[
        logging.FileHandler('app1.log'),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger('Arithmetic App')

def add(a, b):
    res = a + b
    logger.debug(f"Adding {a} + {b} = {res}")  # Fixed logging
    return res

def multiply(a, b):
    res = a * b
    logger.debug(f"Multiplying {a} * {b} = {res}")  # Fixed logging
    return res

def divide(a, b):
    try:
        res = a / b
        logger.debug(f"Dividing {a} / {b} = {res}")  # Fixed logging
        return res
    except ZeroDivisionError:
        logger.error("Division by zero error")
        return None

# Function calls
add(10, 23)
multiply(22, 24)
divide(10, 0)