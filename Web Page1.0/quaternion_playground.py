import numpy as np

def quaternion_multiply(q1, q2):
    w1, x1, y1, z1 = q1
    w2, x2, y2, z2 = q2
    w = w1 * w2 - x1 * x2 - y1 * y2 - z1 * z2
    x = w1 * x2 + x1 * w2 + y1 * z2 - z1 * y2
    y = w1 * y2 - x1 * z2 + y1 * w2 + z1 * x2
    z = w1 * z2 + x1 * y2 - y1 * x2 + z1 * w2
    return np.array([w, x, y, z])

def rotate_quaternion_by_another(q, p):
    p_prime = quaternion_multiply(p, q)
    return p_prime

# Example usage
q = np.array([ 0.9238795, 0.3826834, 0, 0 ])  # Quaternion to be rotated
p = np.array([ 0.9238795, 0, 0.3826834, 0 ])  # Quaternion representing the rotation
result = rotate_quaternion_by_another(q, p)
print("Resulting quaternion after rotation:", result)