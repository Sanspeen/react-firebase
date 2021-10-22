package co.com.sofka.questions.usecases;

import co.com.sofka.questions.collections.Question;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.reposioties.QuestionRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import reactor.core.publisher.Mono;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;

import static org.mockito.Mockito.when;
@SpringBootTest
class UpdateUseCaseTest {

    @SpyBean
    private UpdateUseCase updateUseCase;

    @MockBean
    private QuestionRepository repository;

    @Test
    @DisplayName("Actualizar pregunta")
    void updateTest(){

        var questionDTO = new QuestionDTO("1","1","React o Angular","OPEN",
                "TECNOLOGIA","sfm@gmail.com");

        var question = new Question();
        question.setId("1");
        question.setUserId("1");
        question.setQuestion("React o Angular");
        question.setType("OPEN");
        question.setCategory("TECNOLOGIA");
        question.setUserEmail("sfm@gmail.com");

        when(repository.save(Mockito.any(Question.class))).thenReturn(Mono.just(question));

        var result = updateUseCase.apply(questionDTO);

        Assertions.assertEquals(Objects.requireNonNull(result.block()),"1");
    }


}