package com.stayverify.service;

import com.stayverify.dto.AuthRequest;
import com.stayverify.dto.AuthResponse;
import com.stayverify.dto.RegisterRequest;
import com.stayverify.dto.UserDto;
import com.stayverify.entity.Role;
import com.stayverify.entity.User;
import com.stayverify.exception.BadRequestException;
import com.stayverify.repository.UserRepository;
import com.stayverify.security.JwtTokenProvider;
import com.stayverify.security.UserPrincipal;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtTokenProvider tokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
    }

    @Transactional
    public AuthResponse register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail().trim().toLowerCase())) {
            throw new BadRequestException("An account with email " + req.getEmail() + " already exists.");
        }

        Role role = req.getRole() != null ? req.getRole() : Role.TENANT;
        // Do not allow regular registration to create ADMIN role without admin token
        if (role == Role.ADMIN) {
            role = Role.TENANT;
        }

        String userId = "usr-" + UUID.randomUUID().toString().substring(0, 8);
        User user = new User(
                userId,
                req.getName().trim(),
                req.getEmail().trim().toLowerCase(),
                passwordEncoder.encode(req.getPassword()),
                role,
                req.getPhone() != null ? req.getPhone().trim() : null
        );

        userRepository.save(user);

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail().trim().toLowerCase(), req.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = tokenProvider.generateToken(authentication);
        UserDto userDto = new UserDto(user.getId(), user.getName(), user.getEmail(), user.getRole(), user.getPhone());
        return new AuthResponse(token, userDto);
    }

    public AuthResponse login(AuthRequest req) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail().trim().toLowerCase(), req.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = tokenProvider.generateToken(authentication);
        UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();
        User user = userRepository.findById(principal.getId())
                .orElseThrow(() -> new BadRequestException("User profile could not be found"));

        UserDto userDto = new UserDto(user.getId(), user.getName(), user.getEmail(), user.getRole(), user.getPhone());
        return new AuthResponse(token, userDto);
    }

    public UserDto getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || authentication.getPrincipal().equals("anonymousUser")) {
            return null;
        }

        UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();
        User user = userRepository.findById(principal.getId()).orElse(null);
        if (user == null) return null;
        return new UserDto(user.getId(), user.getName(), user.getEmail(), user.getRole(), user.getPhone());
    }

    public User getCurrentUserEntity() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || authentication.getPrincipal().equals("anonymousUser")) {
            return null;
        }
        UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();
        return userRepository.findById(principal.getId()).orElse(null);
    }
}
