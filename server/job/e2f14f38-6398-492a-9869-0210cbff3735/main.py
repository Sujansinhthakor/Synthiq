from manim import *

config.background_color = BLACK

class MyScene(Scene):
    def construct(self):
        circle_radius = 2
        circle_center = LEFT * 4

        circle = Circle(radius=circle_radius, color=BLUE, stroke_width=4).move_to(circle_center)
        dot = Dot(color=YELLOW).move_to(circle.point_from_proportion(0).move_to(circle_center).get_center())

        axes = Axes(
            x_range=[0, 8, 1],
            y_range=[-2.5, 2.5, 1],
            x_length=8,
            y_length=4,
            tips=False,
            axis_config={"color": GREY_A},
        ).shift(RIGHT * 3)

        sine_wave = VMobject(color=GREEN, stroke_width=4)
        sine_wave.set_points_as_corners([axes.c2p(0, 0)])

        self.play(FadeIn(circle), FadeIn(axes))
        self.play(FadeIn(dot), run_time=0.5)

        wave_points = [axes.c2p(0, 0)]
        n_cycles = 1
        n_points = 100
        for i in range(1, n_points + 1):
            alpha = i / n_points
            angle = -TAU * n_cycles * alpha
            point_on_circle = circle_center + RIGHT * circle_radius * np.cos(angle) + UP * circle_radius * np.sin(angle)
            dot.move_to(point_on_circle)

            x = 8 * alpha
            y = circle_radius * np.sin(-TAU * n_cycles * alpha)
            wave_point = axes.c2p(x, y)
            wave_points.append(wave_point)
            sine_wave.set_points_as_corners(wave_points)

            self.add(sine_wave, dot)
            self.wait(1 / 40)

        self.wait(0.5)
        self.play(dot.animate.set_color(RED).scale(1.3), run_time=0.5)
        self.wait(2)