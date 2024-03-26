class Vector3:
    def __init__(self, x, y, z):
        self.x = x
        self.y = y
        self.z = z

    def __sub__(self, other):
        return Vector3(self.x - other.x, self.y - other.y, self.z - other.z)

def predict_target_position(target_position, target_velocity, time):
    predicted_position = target_position + target_velocity * time
    return predicted_position

def calculate_interception_point(target_position, target_velocity, interceptor_position, interceptor_velocity, interceptor_acceleration):
    time_to_intercept = some_value  # Рассчитайте время до столкновения

    target_predicted_position = predict_target_position(target_position, target_velocity, time_to_intercept)
    target_relative_position = target_predicted_position - interceptor_position
    target_relative_velocity = target_velocity - interceptor_velocity

    time_to_intercept_adjusted = distance(target_relative_position) / speed(target_relative_velocity)

    interception_point = target_predicted_position + target_velocity * time_to_intercept_adjusted

    return interception_point
