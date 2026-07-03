from manim import *
import numpy as np

config.background_color = BLACK

class MyScene(Scene):
    def construct(self):
        circle_radius = 2
        sine_length = 6
        sine_height = 2
        center = LEFT * 3 + UP * 0.5

        # Draw the circle
        circle = Circle(radius=circle_radius, color=BLUE)
        circle.move_to(center)
        self.play(Create(circle))

        # Dot on the circle
        theta_tracker = ValueTracker(0)
        dot = always_redraw(lambda: Dot(
            center + circle_radius * np.cos(theta_tracker.get_value()) * RIGHT +
            circle_radius * np.sin(theta_tracker.get_value()) * UP,
            color=YELLOW,
            radius=0.08
        ))

        # Projection line from circle to sine axis
        vertical_line = always_redraw(
            lambda: Line(
                dot.get_center(),
                [center[0] + circle_radius + 0.5, dot.get_center()[1], 0],
                color=WHITE,
                stroke_width=2
            )
        )

        # Sine axis (horizontal)
        sine_axis = Line(
            [center[0] + circle_radius + 0.5, center[1], 0],
            [center[0] + circle_radius + 0.5 + sine_length, center[1], 0],
            color=WHITE
        )
        self.play(Create(sine_axis))

        # Vertical axis for sine values
        y_axis = Line(
            [center[0] + circle_radius + 0.5, center[1] - sine_height, 0],
            [center[0] + circle_radius + 0.5, center[1] + sine_height, 0],
            color=WHITE
        )
        self.play(Create(y_axis))

        # Dots: one at projection on axis
        proj_dot = always_redraw(
            lambda: Dot(
                [center[0] + circle_radius + 0.5, dot.get_center()[1], 0],
                color=YELLOW, radius=0.07
            )
        )

        # Moving sine trace
        sine_trace = always_redraw(
            lambda: VMobject(color=YELLOW).set_points_smoothly([
                [center[0] + circle_radius + 0.5 + alpha * sine_length / (2 * np.pi),
                 center[1] + circle_radius * np.sin(alpha), 0]
                for alpha in np.linspace(0, theta_tracker.get_value(), 200)
            ])
        )

        # Line connecting circle dot to sine trace dot
        connector = always_redraw(
            lambda: Line(
                dot.get_center(),
                proj_dot.get_center(),
                color=PURPLE, stroke_width=2
            )
        )

        # Add everything to scene
        self.add(dot, sine_trace, proj_dot, vertical_line, connector)

        # Labels
        circle_label = Text("Unit Circle", color=BLUE, font_size=28).next_to(circle, UP)
        x_label = Text("Angle", color=WHITE, font_size=24).next_to(sine_axis, DOWN)
        y_label = Text("sin(θ)", color=WHITE, font_size=24).next_to(y_axis, LEFT)
        self.play(Write(circle_label), Write(x_label), Write(y_label))

        # Animate the dot moving, tracing out the sine wave
        self.play(
            theta_tracker.animate.set_value(2 * np.pi),
            run_time=6,
            rate_func=linear
        )

        self.wait(1)